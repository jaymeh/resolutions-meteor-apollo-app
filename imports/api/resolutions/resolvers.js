import Resolutions from './resolutions';

const res = Resolutions.find({}).fetch();

export default {
  Query: {
    resolutions() {
      return res;
    }
  },

  Mutation: {
    createResolution() {
      console.log('got here');
      // const resolutionId = Resolutions.insert({
      //   'name': 'Test Res'
      // });
    }
  }
}