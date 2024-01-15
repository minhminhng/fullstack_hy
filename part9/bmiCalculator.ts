interface BmiValues {
  height: number
  weight: number
}
const parseArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Input should be numbers\'!');
  }
}

const bmiCalculator = (height: number, weight: number) => {
  const heightInMeter = height / 100
  const bmi = weight / (heightInMeter * heightInMeter);

  let message
  if (bmi < 18.5) {
    message = 'Underweight ';
  }
  else if (bmi >= 18.5 && bmi <= 24.9) {
    message = 'Normal (healthy weight)';
  }
  else if (bmi > 24.9 && bmi <= 29.9) {
    message = 'Overweight ';
  }
  else if (bmi > 29.9) {
    message = 'Obesity ';
  }

  return message;
}

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}