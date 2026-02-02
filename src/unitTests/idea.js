
// since echarts has transforms, this can be our JSON view settings to rebuild the view once re-bootup.
// dont event have an array like on line 20, just set source to a function that returns an array derived from the dataset.

// maybe not since we need a line like 21 where we define the dimensions.
// maybe all filtering for the view should be done with xarray on the backend and just sent as a final result straight to echarts.










var option = {
  dataset: [
    {
      // This dataset is on `datasetIndex: 0`.
      source: [
        ['Product', 'Sales', 'Price', 'Year'],
        ['Cake', 123, 32, 2011],
        ['Cereal', 231, 14, 2011],
        ['Tofu', 235, 5, 2011],
        ['Dumpling', 341, 25, 2011],
        ['Biscuit', 122, 29, 2011],
        ['Cake', 143, 30, 2012],
        ['Cereal', 201, 19, 2012],
        ['Tofu', 255, 7, 2012],
        ['Dumpling', 241, 27, 2012],
        ['Biscuit', 102, 34, 2012],
        ['Cake', 153, 28, 2013],
        ['Cereal', 181, 21, 2013],
        ['Tofu', 395, 4, 2013],
        ['Dumpling', 281, 31, 2013],
        ['Biscuit', 92, 39, 2013],
        ['Cake', 223, 29, 2014],
        ['Cereal', 211, 17, 2014],
        ['Tofu', 345, 3, 2014],
        ['Dumpling', 211, 35, 2014],
        ['Biscuit', 72, 24, 2014]
      ]
      // id: 'a'
    },
    {
      // This dataset is on `datasetIndex: 1`.
      // A `transform` is configured to indicate that the
      // final data of this dataset is transformed via this
      // transform function.
      transform: {
        type: 'filter',
        config: { dimension: 'Year', value: 2011 }
      }
      // There can be optional properties `fromDatasetIndex` or `fromDatasetId`
      // to indicate that where is the input data of the transform from.
      // For example, `fromDatasetIndex: 0` specify the input data is from
      // the dataset on `datasetIndex: 0`, or `fromDatasetId: 'a'` specify the
      // input data is from the dataset having `id: 'a'`.
      // [DEFAULT_RULE]
      // If both `fromDatasetIndex` and `fromDatasetId` are omitted,
      // `fromDatasetIndex: 0` are used by default.
    },
    {
      // This dataset is on `datasetIndex: 2`.
      // Similarly, if neither `fromDatasetIndex` nor `fromDatasetId` is
      // specified, `fromDatasetIndex: 0` is used by default
      transform: {
        // The "filter" transform filters and gets data items only match
        // the given condition in property `config`.
        type: 'filter',
        // Transforms has a property `config`. In this "filter" transform,
        // the `config` specify the condition that each result data item
        // should be satisfied. In this case, this transform get all of
        // the data items that the value on dimension "Year" equals to 2012.
        config: { dimension: 'Year', value: 2012 }
      }
    },
    {
      // This dataset is on `datasetIndex: 3`
      transform: {
        type: 'filter',
        config: { dimension: 'Year', value: 2013 }
      }
    }
  ],
  series: [
    {
      type: 'pie',
      radius: 50,
      center: ['25%', '50%'],
      // In this case, each "pie" series reference to a dataset that has
      // the result of its "filter" transform.
      datasetIndex: 1
    },
    {
      type: 'pie',
      radius: 50,
      center: ['50%', '50%'],
      datasetIndex: 2
    },
    {
      type: 'pie',
      radius: 50,
      center: ['75%', '50%'],
      datasetIndex: 3
    }
  ]
};