# Battery Tracking App Project

This project represents the application with battery tracking information.
It calculates daily average of consumption of batteries in planchets with the following steps:

1. Calculate daily average consumption for a continuous sequence of decreasing values. The first value greater than the previous one is the start of a new sequence.
<pre>
|  1.0 0.9 0.8   |   0.9 0.7 0.5   |  0.6 0.4 0.1

| first sequence | second sequence | third sequence

</pre>

2. Calculate duration time for each sequence
3. Add all the multiplied values of consumption and duration and divide by the sum of all durations

In this case, we take into account the duration and measure consumption accordingly

## Run project

You need to perform the following actions to run Battery Tracking App:

1. Copy the .env file for the local deployment

```sh
cp .env.example .env
```

2. Place the JSON file with the data in the shared folder. If the filename is different from `battery-data.json`, update the filename in the `.env` file.

3. Install the required packages

```sh
npm ci
```

4. Run the project

```sh
npm start
```

## Test project

To run tests in the project, you need to execute the following command in the terminal:

```sh
npm test
```

## Ideas to improve the app

- Add caching
- Add more tests that check edge cases
- Add an Error Boundary component to handle all errors
- Add functionality to mark device batteries that have been replaced
- Add data sorting from JSON/API by date
- Add pre-commit hooks to run linters and tests

Note:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
