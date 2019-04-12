const jwt = require('jsonwebtoken');

const data = {
  iss: 'https://login.selfstudy.com/',
  sub: 'auth0|firebase-selfstudy|selfstudyplus-prod|simplelogin:11059',
  aud: [
    'https://pd-static.selfstudy.com/api/v1',
    'https://selfstudy.auth0.com/userinfo',
  ],
  azp: 'EEpld53oPXgAaFQy2y76vu0T79gGFYSM',
  app_metadata: {
    authorization: {
      roles: [
        'admin',
        'curator-oa',
        'questionwriter-utsw',
        'questionwriter-mmc',
        'questionwriter-*',
        'questionwriter-emory',
        'questionwriter-scitent',
        'questionwriter-oa',
        'questionwriter-bidmc',
        'questionwriter-dev',
        'questionwriter-abvlm',
        'questionwriter-nbcrna',
        'questionwriter-navy',
        'questionwriter-oa_twins',
      ],
    },
  },
};
const secret = 'uhqjLFGTwvhI2KnDElxD202Nb9vJjgnp';
const newJwt = jwt.sign(data, secret, { expiresIn: '10d' });
console.log(newJwt);
