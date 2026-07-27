const records = new Map([
  [1, { id: 1, title: 'Promise notes' }],
]);

function loadRecord(recordId, callback) {
  queueMicrotask(() => {
    const record = records.get(recordId);
    if (!record) {
      callback(new Error(`Record ${recordId} not found`));
      return;
    }
    callback(null, record);
  });
}

function run(recordId, callback) {
  loadRecord(recordId, (error, record) => {
    if (error) {
      console.log('caught:', error.message);
    } else {
      console.log('loaded:', record.title);
    }
    callback();
  });
}

run(99, () => {});
