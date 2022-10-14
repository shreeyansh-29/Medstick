import Realm from 'realm'


export const Medicine={
    name:'Medicine',
    properties:{
        _id:'string',
        medicineName:'string',
        description: 'string',
        medicineDetails: {type: 'list', objectType: 'MedicineDetail'},
    },
    primaryKey: '_id',
}

export const MedicineDetails = {
    name: 'MedicineDetail',
    embedded: true,
    properties: {
      _id: 'string',
      dosageType: 'string',
      dosageQuantity: 'string',
      dosageUnit: 'string',
      stock: {type: 'int', default: 0},
      leftStock: {type: 'int', default: 0},
      notes: 'string',
    },
  };

export const realm =new Realm({
    schema:[Medicine,MedicineDetails]
})


const View=realm.objects('Medicine')
console.log(View,"table")