// eslint-disable-next-line no-undef
module.exports = (plop) => {
  plop.setWelcomeMessage('Bem vindo ao gerador de componentes automático!');
  plop.setGenerator('crud', {
    description: 'Gerar os arquivos básicos para gerar tela de CRUD',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome do módulo? (São válidos nomes com subpastas - Ex.: nomeModulo/NomeModulo',
      },
    ],
    actions: [
      '------------------------------',
      '.Generando o novo tela...',
      '------------------------------',
      {
        type: 'add',
        path: '../src/domain/types/I{{pascalCase (getName name)}}.ts',
        templateFile: 'templates/type.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/pages/{{pascalCase (getName name)}}/index.tsx',
        templateFile: 'templates/tela.tsx.hbs',
        force: true,

      },
      {
        type: 'add',
        path: '../src/pages/{{pascalCase (getName name)}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/services/{{pascalCase (getName name)}}Service/{{getPasta name}}Service.ts',
        templateFile: 'templates/service.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/stores/{{pascalCase (getName name)}}Store.ts',
        templateFile: 'templates/store.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/routes.tsx',
        pattern: '} />',
        templateFile: 'templates/addRoutes.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/routes.tsx',
        pattern: '//nossos imports',
        templateFile: 'templates/addimportRoute.ts.hbs',
      },
      '--------------------------------------------------',
      '🤲 Componente gerando com sucesso! Luan é foda 🤲',
      '--------------------------------------------------',
    ],
  });
  plop.setGenerator('component', {
    description: 'Gerar os arquivos básicos para de um componente',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome do Component? Ex.: nameComponent/NameComponent',
      },
    ],
    actions: [
      '------------------------------',
      '.Generando o novo component...',
      '------------------------------',
      {
        type: 'add',
        path: '../src/components/{{pascalCase (getName name)}}/index.tsx',
        templateFile: 'templates/component.tsx.hbs',
        force: true,

      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase (getName name)}}/styles.ts',
        templateFile: 'templates/style-component.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase (getName name)}}/{{lowerCase (getName name)}}.stories.mdx',
        templateFile: 'templates/stories-page.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/components/index.tsx',
        pattern: '//export default',
        templateFile: 'templates/addImportIndex.tsx.hbs',
      },
      '--------------------------------------------------',
      '🤲 Componente gerando com sucesso! Luan é foda 🤲',
      '--------------------------------------------------',
    ],
  });

  plop.setGenerator('page', {
    description: 'Gerar os arquivos básicos para de um page!',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome da pagina e seu modulo? Ex.: NomePage/nomeModulo',
      },
    ],
    actions: [
      '------------------------------',
      '.Generando o novo pagina...',
      '------------------------------',
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/index.tsx',
        templateFile: 'templates/page.tsx.hbs',
        force: true,

      },
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/styles.ts',
        templateFile: 'templates/style-page.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/{{lowerCase (getName name)}}.stories.mdx',
        templateFile: 'templates/stories-page.ts.hbs',
      },
      // {
      //   type: 'add',
      //   path: '../src/stores/{{pascalCase (getName name)}}Store.ts',
      //   templateFile: 'templates/store-page.ts.hbs',
      // },
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/services/{{getPasta name}}Service.ts',
        templateFile: 'templates/service-page.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/routes//app.routes.tsx',
        pattern: '{/* nossas rotas */}',
        templateFile: 'templates/addRoutes.ts.hbs',
      },
      {
        type: 'append',
        path: '../src/routes/app.routes.tsx',
        pattern: '//nossos imports',
        templateFile: 'templates/addimportRoute.ts.hbs',
      },
      '--------------------------------------------------',
      '🤲 Componente gerando com sucesso! Luan é foda 🤲',
      '--------------------------------------------------',
    ],
  });

  plop.setGenerator('report-simple', {
    description: 'Gerar os arquivos básicos para de um relatório!',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome da pagina e seu modulo? Ex.: NomePage/nomeModulo',
      },
    ],
    
    actions: [
      '------------------------------',
      '.Generando o novo pagina...',
      '------------------------------',
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/index.tsx',
        templateFile: 'templates/page.tsx.hbs',
        force: true,

      },
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/styles.ts',
        templateFile: 'templates/style-page.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/module/{{lowerCase (getName name)}}/pages/{{pascalCase (getPasta name)}}/{{lowerCase (getName name)}}.stories.mdx',
        templateFile: 'templates/stories-page.ts.hbs',
      },
      // {
      //   type: 'add',
      //   path: '../src/stores/{{pascalCase (getName name)}}Store.ts',
      //   templateFile: 'templates/store-page.ts.hbs',
      // },
      // {
      //   type: 'add',
      //   path: '../src/services/{{pascalCase (getName name)}}Service/{{getPasta name}}Service.ts',
      //   templateFile: 'templates/service-page.ts.hbs',
      // },
      // {
      //   type: 'append',
      //   path: '../src/routes.tsx',
      //   pattern: '} />',
      //   templateFile: 'templates/addRoutes.ts.hbs',
      // },
      // {
      //   type: 'append',
      //   path: '../src/routes.tsx',
      //   pattern: '//nossos imports',
      //   templateFile: 'templates/addimportRoute.ts.hbs',
      // },
      '--------------------------------------------------',
      '🤲 Componente gerando com sucesso! Luan é foda 🤲',
      '--------------------------------------------------',
    ],
  });

  plop.setHelper('getPath', namePath => {
    let path = '/';
    const directories = namePath.split('/');

    if (directories.length > 1) {
      directories.pop();
      path += directories.join('/');
    }

    return path;
  });


  plop.setHelper('getImportPath', namePath => {
    const defaultValue = 2;
    let path = Array(defaultValue)
      .fill()
      .map(() => '..')
      .join('/');

    const directories = namePath.split('/');

    if (directories.length > defaultValue) {
      path = directories.map(() => '..').join('/');
    }

    return path;
  });

  plop.setHelper('getReferencePath', namePath => {
    const defaultValue = 1;
    let path = Array(defaultValue)
      .fill()
      .map(() => '..')
      .join('/');

    const directories = namePath.split('/');

    if (directories.length > defaultValue) {
      directories.pop();
      path = directories.map(() => '..').join('/');
    }

    return path;
  });

  plop.setHelper('getName', namePath => namePath.split('/').pop());
  plop.setHelper('getPasta', namePath => namePath.split('/').shift());
}