module.exports = function (req, res) {

  var col=['events','ppr','aircrafts','aircrafttypes']

  function collectioncreate(element, index, array) {
    var collection = global.db.get(element);
    collection.drop();
    console.log('a[' + index + '] Drop:' + element);
  }
  col.forEach(collectioncreate);

  var collection = global.db.get('aircrafts');
  collection.insert(
     [
      {'registration': 'DEWKW', 'ptype': 'EXTRA 330'},
      {'registration': 'DEWAQ', 'ptype': 'DA40'},
      {'registration': 'DEWAV', 'ptype': 'DA20'},
      {'registration': 'DEMOW', 'ptype': 'MJ20'},
      {'registration': 'DEWAE', 'ptype': 'C172'}
     ]
  )





  var collection = global.db.get('aircrafttypes');
  collection.insert(
     [
      {'ptype': 'EXTRA 330',  'mtow': 950, 'desc': 'Extra 330 LX'},
      {'ptype': 'DA40',      'mtow': 1150, 'desc': 'Diamond Aircraft DA40'},
      {'ptype': 'DA20',      'mtow': 750, 'desc': 'Diamond Aircraft DA20'},
      {'ptype': 'MJ20',      'mtow': 1150, 'desc': 'Mooney MJ20'},
      {'ptype': 'PA28',    'mtow': 1107, 'desc': 'Piper PA28-161'},
      {'ptype': 'C172',      'mtow': 1113 ,'desc': 'Cessna C172'}
     ]
  )

  res.redirect('/events/monitor');





  }
