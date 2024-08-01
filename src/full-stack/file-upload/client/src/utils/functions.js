export function daytimeGreeter() {
  let greeting = '';
  const now = new Date();
  const hour = now.getHours();
  if ((hour >= 22) | (hour < 6)) greeting = 'Have a restful night';
  else if (hour >= 18) greeting = 'Good evening';
  else if (hour >= 14) greeting = 'Good afternoon';
  else if (hour >= 10) greeting = 'Have a great day';
  else if (hour >= 6) greeting = 'Good morning';
  return greeting;
}
