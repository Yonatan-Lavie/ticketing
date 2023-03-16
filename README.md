Coming soon!!!

update shared library:

1. make changes in the common library.
2. run publish command

   ```
   npm run pub
   ```

3. update in services

   ```
   npm update --save @ly-common-lib/common
   ```

You can then use these commands:

- Checks for updates from the package.json file
  ```
  ncu
  ```
- Update the package.json file
  ```
  ncu -u
  ```
- Update your package-lock.json file from the package.json file
  ```
  npm update --save
  ```
  add ingress
  ```
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
  ```
