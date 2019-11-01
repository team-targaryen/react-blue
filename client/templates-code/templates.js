const defaultSyntax = {};

defaultSyntax.InitialClassSyntax = function (inputName = "Template_Class") {
  (this.name = "React Class Syntax - DEFAULT"),
    (this.code = `import React, { Component } from 'react';

/* ADD your template code anywhere but please do not delete 'DONOTDELETETHISSTRING' */

class ${inputName} extends Component {
  constructor(props){
    super(props);
    this.state = {
      isTemplateClassComponent: true,
      
    };
  };

render(){

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
/* ADD your template code anywhere but please do not delete 'DONOTDELETETHISSTRING' */

const ${inputName} = ({/* INSERT PROPS HERE */}) =>{
  const [istemplateHookComponent, setIstemplateHookComponent] = useState(true);
  
  return(

    <React.Fragment>

    DONOTDELETETHISSTRING 
    
    </React.Fragment>

  )
}`);
};
module.exports = defaultSyntax;
