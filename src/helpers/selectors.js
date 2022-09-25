export function getAppointmentsForDay(state, day) {
  let dayApts = [];
  let aptsDetails = [];
  for (const weekday of state.days) { 
    if (weekday.name === day) {
      dayApts = weekday.appointments;   
    };  
  };
  for (const appointment of dayApts) {
    const apt = state.appointments[appointment.toString()];
    aptsDetails.push(apt);
  }
  return aptsDetails;
};


export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return result;
  
  // const interviewDetails = {...interview};
  // const interviewers = Object.values(state.interviewers);
  // for (const interviewer of interviewers) {
  //   if (interview.interviewer === interviewer.id) {
  //     interviewDetails.interviewer = interviewer;
  //   }
  // }
  // console.log("interviewDetails:", interviewDetails);
  // return interviewDetails;
};