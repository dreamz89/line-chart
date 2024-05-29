# Live Link

https://time-series-line-chart.vercel.app/

## Project Requirements

Create a frontend application utilizing NUXT and Tailwind CSS, featuring a single route and its corresponding page. This page should include a header, a footer with placeholder content, and an interactive time-series line chart. By interactive, we mean the ability to select dimensions from the provided tabular sample dataset and dynamically visualize the results.

You have the flexibility to choose the chart library that best suits your needs. The sample dataset is hosted at https://testwithfastapi.s3.amazonaws.com/sample1.csv. Utilize the S3 Select API, as outlined in the documentation at https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html. You may employ any S3 SDK of your preference. Since the data source is publicly accessible, authentication headers such as x-amz-server-side-encryption-customer-algorithm, x-amz-server-side-encryption-customer-key, x-amz-server-side-encryption-customer-key-MD5, and x-amz-expected-bucket-owner can be omitted in the API requests.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```
