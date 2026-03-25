main();

async function main() {
  const arrNameUserGithub = ['8', '960bg', '1', 'no.such.users', 'sass', '9'];
  const dataUsers = await getUsers(arrNameUserGithub);
  console.log('dataUsers = ');
  console.log(dataUsers);
}

async function getUsers(names) {
  try {
    const promises = [];
    names.forEach((element, index) => {
      const url = `https://api.github.com/users/${element}`;
      promises.push(
        fetch(url)
          .then(
            (response) => {
              if (!response.ok) {
                return null;
              }
              return response.text();
            },
            (rejected) => {
              return null;
            }
          )
          .then((text) => {
            console.log(index + 1, 'элемент: ', element);
            console.log(JSON.parse(text));
            return JSON.parse(text);
          })
      );
    });

    const dataUsers = await Promise.all(promises);
    return dataUsers;
  } catch (error) {
    console.log('Ошибка сервера', error);
  }
}
