import json
import logging
from app.models.models import client
from app.models.schemas import CheckupRequest, CheckupResponse

CHECKUP_ANALYSIS_PROMPT = (
    "You are a licensed mental health evaluator named RIPEX. "
    "Given a series of psychological assessment responses (each rated from 1 to 5), "
    "analyze the user's average score and generate a mental health report in the **exact** JSON format below:\n\n"
    "{\n"
    '  "score": "avg_score",\n'
    '  "level": "mental_state",\n'
    '  "recommendation": "your_advice",\n'
    '  "analysis": "detailed_analysis"\n'
    "}\n\n"
    "Rules:\n"
    "- If avg_score <= 2: level = depressed\n"
    "- If avg_score <= 3: level = anxious\n"
    "- If avg_score <= 4: level = high stress\n"
    "- Else: level = confident\n\n"
    "Now based on this logic and provided scores, return only the JSON response. Do not include any other explanation."
)

class CheckupService:
    def __init__(self):
        self.client = client
        self.model = "gemini-2.5-flash"

    def generate_mental_report(self, request: CheckupRequest) -> CheckupResponse:
        try:
            payload = request.questions
            if not payload:
                raise ValueError("Payload cannot be empty.")

            scores = [item.optionSelected for item in payload]
            avg_score = round(sum(scores) / len(scores), 2)

            questions_formatted = "\n".join(
                f"- {item.currentQuestion} [Score: {item.optionSelected}]" for item in payload
            )

            prompt = f"{CHECKUP_ANALYSIS_PROMPT}\n\nUser Responses:\n{questions_formatted}\n\nAverage Score: {avg_score}"

            response = self.client.models.generate_content(
                model=self.model,
                contents=[prompt]
            )

            try:
                raw_text = response.text.strip()

                # Remove markdown code block wrappers if present
                if raw_text.startswith("```json"):
                    raw_text = raw_text.lstrip("```json").rstrip("```").strip()
                elif raw_text.startswith("```"):
                    raw_text = raw_text.lstrip("```").rstrip("```").strip()

                response_dict = json.loads(str(raw_text))
            except json.JSONDecodeError as je:
                logging.error(f"Failed to decode Gemini response: {response.text}")
                raise ValueError("Gemini response is not valid JSON")

            report = CheckupResponse(**response_dict)
            return report

        except ValueError as ve:
            logging.error(f"Validation error: {ve}")
            raise
        except Exception as e:
            logging.exception("Unexpected error during mental health checkup")
            raise

# Public function used in route
def process_checkup(data: CheckupRequest, user) -> CheckupResponse:
    # If you want to log or save the user interaction, do it here
    service = CheckupService()
    return service.generate_mental_report(data)