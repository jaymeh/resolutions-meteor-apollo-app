import Resolutions from './resolutions';

// Resolutions.insert({
//   'name': 'Test Res'
// });

const res = Resolutions.find({}).fetch();

export default {
  Query: {
    resolutions() {
      return res;
    }
  }
}