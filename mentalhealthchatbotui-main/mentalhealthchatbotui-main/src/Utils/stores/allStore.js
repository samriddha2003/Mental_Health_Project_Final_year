// allStore.js
import { makeAutoObservable } from 'mobx';

class AllStore {
  questionnarieValues = [];
  submitQuestionarrie = false;
  loginVal= false;
  recommedations = {}
  doctorList = {}

  constructor() {
    // This makes all properties and methods observable and action-bound
    makeAutoObservable(this);
  }

  // This method will automatically be treated as a MobX action
  // because it modifies an observable property.
  setQuestionnarieValues =(newValues) => {
    this.questionnarieValues = newValues;
  }

  setSubmitQuestionarrie=(value)=>{
    this.submitQuestionarrie=value;
  }

  setLoginVal=(val)=>{
    this.loginVal=val
  }
  
  setRecommedations = (val) =>{
    this.recommedations=val;
  }

  setDocorList = (val) =>{
    this.doctorList=val;
  }
}

// Ensure you are exporting and importing a SINGLETON instance
const allStore = new AllStore();
export default allStore;