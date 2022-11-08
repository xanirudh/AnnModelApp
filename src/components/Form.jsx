import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as tf from "@tensorflow/tfjs";



const Form = ({handleShowModal}) => {

  const url = {
    model: 'https://xanirudh.github.io/DeepLeaningAnnAPI/annApi/model.json',
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [model, setModel] = useState();

    

    useEffect(()=>{
      tf.ready().then(()=>{
      loadModel(url)
      });
      },[])

    async function loadModel(url) {
      try {
      
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
      console.log("Load model success")
      }
      catch (err) {
      console.log(err);
      }
      }

    

  const onSubmit = (data) => { 
    const result = JSON.stringify(data,null,4)
    var parsedResult = JSON.parse(result)
    const response = [];
     response[0] = parsedResult.satisfaction_level;
     response[1] = parsedResult.last_evaluation;
     response[2] = parsedResult.number_project;
     response[3] = parsedResult.average_monthly_hours;
     response[4] = parsedResult.time_spend_company;
     response[5] = parsedResult.work_accident;
     response[6] = parsedResult.promotion_last_5years;
      switch(parsedResult.department) {
        case "department_RandD":
          response[7] = "1";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";

          break;
        
        case "department_accounting":
          response[7] = "0";
          response[8] = "1";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_hr":
          response[7] = "0";
          response[8] = "0";
          response[9] = "1";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_management":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "1";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_marketing":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "1";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_product_mng":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "1";
          response[13] = "0";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_sales":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "1";
          response[14] = "0";
          response[15] = "0";
          break;
        
        case "department_support":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "1";
          response[15] = "0";
          break;
        
        case "department_technical":
          response[7] = "0";
          response[8] = "0";
          response[9] = "0";
          response[10] = "0";
          response[11] = "0";
          response[12] = "0";
          response[13] = "0";
          response[14] = "0";
          response[15] = "1";
          break;
        
        
      }
      switch (parsedResult.salary) {

        case "salary_low":
          response[16] = "1";
          response[17] = "0";
          
        case "salary_medium":
          response[16] = "0";
          response[17] = "1";

        default:
          response[16] = "0";
          response[17] = "0";


      }
     manipulator(response);
  }
  console.log(errors);


  const manipulator = (arr) => {
    const newArr = arr.map((n) => {
      return parseFloat(n)
    })
      newArr[0] = newArr[0] / 100;
      newArr[1] = newArr[1] / 100;
      const calStandDevi = standardDevi(newArr)
      const calMean = mean(newArr)

      const finalArr = newArr.map((n) => {

        return (n-calMean) / calStandDevi

      })

      predict(finalArr)
      
  }

  const newManipulator = (arr) => {
    
  }
  
function standardDevi(arr){
  // Creating the mean with Array.reduce
  let mean = arr.reduce((acc, curr)=>{
    return acc + curr
  }, 0) / arr.length;
   
  // Assigning (value - mean) ^ 2 to every array item
  arr = arr.map((k)=>{
    return (k - mean) ** 2
  })
   
  // Calculating the sum of updated array
 let sum = arr.reduce((acc, curr)=> acc + curr, 0);
  
 // Calculating the variance
 let variance = sum / arr.length
  
 // Returning the Standered deviation
 return Math.sqrt(sum / arr.length)
}

function mean(arr){
  // Creating the mean with Array.reduce
  let mean = arr.reduce((acc, curr)=>{
    return acc + curr
  }, 0) / arr.length;

  return mean
}


  async function predict(arr){


        var results = model.predict(tf.tensor2d([[arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], 
          arr[10], arr[11], arr[12], arr[13], arr[14], arr[15], arr[16], arr[17]]]))

        var resultArr = await results.array()
        const finalResult = (Math.round(parseFloat(resultArr[0])*100))
          console.log(finalResult)
        handleShowModal(finalResult)
        
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" class="w-full max-w-sm" >
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Satisfaction Level {`(%)`}
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="inline-full-name" type="text" placeholder="e.g. 72" {...register("satisfaction_level", {required: true, maxLength: 3})}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Last Evaluation Score {`(%)`}
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="inline-full-name" type="text" placeholder="e.g. 64" {...register("last_evaluation", {required: true, maxLength: 3})}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Number of Projects
      </label>
    </div>
    <div class="md:w-2/3">
      <select 
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...register("number_project", { required: true })}>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
       </select>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Average monthly hours
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="inline-full-name" type="text" placeholder="e.g. 250" {...register("average_monthly_hours", {required: true, maxLength: 5})}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Time spend in company {`(years)`}
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="inline-full-name" type="text" placeholder="e.g. 4" {...register("time_spend_company", {required: true, maxLength: 3})}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Work Accident
      </label>
    </div>
    <div class="md:w-2/3">
    <select 
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...register("work_accident", { required: true })}>
         <option value="0">No</option>
         <option value="1">Yes</option>
       </select>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Promotion in last 5 years
      </label>
    </div>
    <div class="md:w-2/3">
    <select 
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...register("promotion_last_5years", { required: true })}>
         <option value="0">No</option>
         <option value="1">Yes</option>
       </select>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Department
      </label>
    </div>
    <div class="md:w-2/3">
    <select 
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...register("department", { required: true })}>
         <option value="department_sales">Sales</option>
         <option value="department_accounting">Accounting</option>
         <option value="department_hr">HR</option>
         <option value="department_technical">Technical</option>
         <option value="department_support">Support</option>
         <option value="department_management">Management</option>
         <option value="department_product_mng">Product Management</option>
         <option value="department_marketing">Marketing</option>
         <option value="department_RandD">Random Department</option>
       </select>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Salary
      </label>
    </div>
    <div class="md:w-2/3">
    <select 
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...register("salary", { required: true })}>
         <option value="salary_low">Low</option>
         <option value="salary_medium">Medium</option>
         <option value="salary_high">High</option>
       </select>
    </div>
  </div>
  
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button type="submit" class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >
        Predict
      </button>
    </div>
  </div>
</form>
  )
}

export default Form