# Battery Tracking App Project

This project represents the application with battery tracking information.
It calculates daily average of consumption of batteries in planchets with the following steps:

1. Calculate daily average consumption for a continuous sequence of decreasing values. The first value greater than the previous one is the start of a new sequence.
<pre>
|  1.0 0.9 0.8   |   0.9 0.7 0.5   |  0.6 0.4 0.1

| first sequence | second sequance | third sequance

</pre>

2. Calculate duration time for each sequance
3. Then add all the multiplied values of consumption and duration and divide by the sum of all durations

In this case, we do not lose the importance of long durations.

## Run project

You need to perform the following actions to run Battery Tracking App:

1. Place the JSON file with the data in the shared folder. If the filename is different from `battery-data.json`, update the filename in the `.env` file.

2. Install the required packages

```sh
npm ci
```

3. Run the project

```sh
npm start
```

## Test project

To run tests in the project, you need to execute the following command in the terminal:

```sh
npm test
```

## Idea to improve the app

- Add caching
- Add more tests that check edge cases
- Add an Error Boundary component to handle all errors
- Add functionality to mark device batteries that have been replaced

Note:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
