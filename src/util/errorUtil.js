import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from './textUtil';

const showErrorFromArray = errors => {
  Object.keys(errors).forEach(key => {
    const errorText = `${capitalizeFirstLetter(key)} - ${errors[key][0]}`;

    toast.error(errorText, {
      toastId: errorText
    });
  });
};

export default {
  showErrorFromArray
};
