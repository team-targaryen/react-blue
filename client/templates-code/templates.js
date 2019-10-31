const defaultSyntax = {};

defaultSyntax.InitialClassSyntax = function (inputName = "Template_Class") {
  (this.name = "React Class Syntax - DEFAULT"),
    (this.code = `import React, { Component } from 'react';

/* ADD your modular shit */

class ${inputName} extends Component {
  constructor(props){
    super(props);
    this.state = {
      template: null,
      isCreated: true,
      
    };
  };

render(){
  /* Add render Logic Here*/
  return(

    <React.Fragment>

    DONOTDELETETHISSTRING

    </React.Fragment>

  );
 };
};`
    );
};

defaultSyntax.InitialHookSyntax = function (inputName = "Template_Hooks") {
  (this.name = "React Hooks Syntax"),
    (this.code = `import React, { useState } from 'react';

const ${inputName} = ({/* INSERT PROPS HERE */}) =>{
  /* ADD your modular shit */
  const [istemplate, setIsTemplate] = useState(null);
  return(

    <React.Fragment>

    DONOTDELETETHISSTRING 
    
    </React.Fragment>

  )
}`);
};
module.exports = defaultSyntax;
