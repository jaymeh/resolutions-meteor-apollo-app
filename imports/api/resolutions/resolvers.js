import Resolutions from './resolutions';

const res = Resolutions.find({}).fetch();

export default {
  Query: {
    resolutions() {
      return res;
    }
  },

  Mutation: {
    createResolution(obj, { name }, context) {
      const resolutionId = Resolutions.insert({
        name: name
      });

      return Resolutions.findOne(resolutionId);
    }
  }
}