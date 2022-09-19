import _ from 'lodash';

const updateContactedOrgs = (newData, user, updFn, run) => {
  if (!user.orgs[0].contactedOrgs.some(item => item.name === newData.name)) {
    const data = {
      email: user.email,
      ..._.pick(user.orgs[0], [
        'name',
        'description',
        'imageSrc',
        'contact',
        'contactedOrgs',
      ]),
    };
    data.contactedOrgs.push(newData);
    run(updFn(data));
  }
};

export default updateContactedOrgs;
