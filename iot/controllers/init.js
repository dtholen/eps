module.exports = function (req, res) {

  var col=['events','devices','aircrafts', 'aircrafttypes','device','ppr','device_status','device_type']

  function collectioncreate(element, index, array) {
    var collection = global.db.get(element);
    collection.drop();
    console.log('a[' + index + '] Drop:' + element);
  }
  col.forEach(collectioncreate);  
  }
