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