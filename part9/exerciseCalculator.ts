interface CalculatorValues {
  hours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const hoursStr: string[] = args[2].replace(/[\[\]']/g, '').split(',');
  const hours = hoursStr.map(h => {
    if (!isNaN(Number(h))) {
      return (Number(h));
    }
    else {
      throw new Error ('Input should be in format \'[mon_hours,tue_hours,... ]');
    }
  })

  if (!isNaN(Number(args[3]))) {
    return {
      hours: hours,
      target: Number(args[3])
    }
  } else {
    throw new Error('Input should be a number\'!');
  }
}

const exerciseCalculator = (hours: number[], target: number) : Result => {
  const average = hours.reduce((h, sum) => sum + h, 0) / 7
  let rating
  let ratingDescription
  if (average > target) {
    rating = 3;
    ratingDescription = 'Well done';
  } else if (average > (0.8 * target)) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Too bad';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}