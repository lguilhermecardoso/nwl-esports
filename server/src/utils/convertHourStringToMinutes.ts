export function convertHourStringToMinutes(hourString: string){
  const [hours, minutes] = hourString.split(':').map(Number);

  const minutsAmmount = hours * 60 + minutes;

  return minutsAmmount;
}