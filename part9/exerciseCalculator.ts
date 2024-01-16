interface ExerciseValues {
  daily_exercises: number[];
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

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const daily_exercisesStr: string[] = args[2].replace(/\[\]']/g, '').split(',');
  const daily_exercises = daily_exercisesStr.map(h => {
    if (!isNaN(Number(h))) {
      return (Number(h));
    }
    else {
      throw new Error ('Input should be in format \'[mon_daily_exercises,tue_daily_exercises,... ]');
    }
  });

  if (!isNaN(Number(args[3]))) {
    return {
      daily_exercises: daily_exercises,
      target: Number(args[3])
    };
  } else {
    throw new Error('Input should be a number\'!');
  }
};

const exerciseCalculator = (daily_exercises: number[], target: number) : Result => {
  const average = daily_exercises.reduce((h, sum) => sum + h, 0) / 7;
  let rating;
  let ratingDescription;

  if (target === 0 ||  !daily_exercises.length) {
    throw new Error('parameter missing');
  }
  else if (isNaN(target) || daily_exercises.some(e => isNaN(e))) {
    throw new Error ('malformatted parameters');
  }

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
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter(h => h > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const { daily_exercises, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default exerciseCalculator;