export interface AddUserParams {
  GroupName: string;
  UserPoolId: string;
  Username: string;
}

export const addUserToGroup = async (
  service: AWS.CognitoIdentityServiceProvider,
  params: AddUserParams
) => {
  return new Promise((resolve, reject) => {
    service.adminAddUserToGroup(params, (err: any, data: any) => {
      if (!err) {
        console.log("Successful...");
        resolve(JSON.stringify(data));
      } else {
        console.log("error!");
        reject(err);
      }
    });
  });
};

export const adminCreateCognitoUser = async (service: any, params: any) => {
  return new Promise((resolve, reject) => {
    service.adminCreateUser(params, (err: any, data: any) => {
      if (!err) {
        console.log("Successful...Cognito");
        resolve(data);
      } else {
        console.log("Error!...Cognito");
        reject(err);
      }
    });
  });
};
