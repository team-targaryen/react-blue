# React Blue

React Blue is a prototyping and visualization tool that helps engineers build component trees with custom templates. We envision the ability for engineers to quickly create their component file structure coupled with a friendly UI/UX. This tool provides an export feature that sets up a pre-configured development environment for front-end and full-stack React applications.

React Blue is in beta. The founding team is actively working on new features to improve the tool. All feedback is welcome. Please post issues directly to this GitHub.

## Getting Started

React Blue is a client-side application available via the browser and a downloadable GUI.

**Browser**<br />
https://reactblue.io/app

**Desktop GUI (alpha)**<br />
Download (Mac, Windows, Linux)

1. Extract file
2. Run application
   How to Use
   When starting, an ‘App’ component will always pre-populate in order to serve as your prototype’s root node.

Main Display visually renders the hierarchical component tree. Clicking a node on the tree makes it the ‘Current Component’ and subject for edits. Left Panel functions as the control center. It contains three separate tabs: Current Component & Current File-Structure, Templates and SubTrees.

## Usage

Control Center _left panel_

1. Current Component _inside of left panel, 1st Icon_ :

- To ADD a new Component: input text below ‘Add Child’, check the Container checkbox (if applicable), and click the ‘+’ button.

- To RENAME a Component: input text below ‘Current Component’ (ensure your desired component is already selected) and click outside the text field.

- To EDIT a Component’s Container classification: check/uncheck the checkbox below ‘Current Component’ (ensure your desired component is already selected).

- To DELETE a Component: click the ‘-’ button below ‘Current Component’ (ensure your desired component is already selected).

- To VIEW/UNVIEW a list of all Components and Containers: click the ‘Toggle File Tree’ button.

- Parent components have the option of toggling the 'SubTree' checkbox; _HIGHLY SUGGESTED_ for heavily nested or complex relationships between parent/child. Utilize this feature if your tree has over 70+ Components.

- SUMMARY: Add, edit and/or delete components within the top half. Create a name for your component, this will be the _Actual_ name of the component so be mindful of your naming conventions. You have the option to choose a template before you create the Component/Container (which is a toggle, True is Container and False is Component). You can always change these presets later on, so don't worry about choosing the wrong option.

2. Current File-Structure: - Click the toggle to view the components under _Container_ or _Component_. You can also click on a component to make it the _Current Component_ display.

Templates _inside of left panel click, 2nd Icon_

- Create and edit file templates. Templates will default to Class Syntax, you have the option to choose the default Hook Syntax, and or create your own template. Assign any/all templates to specific components in the Current Component.
  SubTree _inside of left panel click, 3rd Icon_

## Export

When you are finished creating your file structure generate a zip package of your pre-configured codebase by clicking the right ‘Export’ button.

## Shorcuts and View

Keyboard shortcuts right at your fingertips to perform undo (ctrl+z) and redo (ctrl+shift+z) actions and toggle between horizontal and vertical views of the component tree.

Our tool is your playground.

---

**Disclaimer**<br />
Currently, client-side caching is available for both browser and downloaded version of the application. If a page does not load within the browser, clear the local storage cache.

**License**<br />
This project is under the MIT License.

**Authors**<br />
Darren Zhu: https://github.com/joodongri<br />
Kendall Lu: https://github.com/kendall-lu<br />
Krystal Chen: https://github.com/kcrystalchen<br />
Randy Reyes: https://github.com/rqreyes

**Acknowledgements**<br />
Huge thank you to Victoria Adnet (https://www.linkedin.com/in/victoria-lellis/) for her input, advice and mentorship.

React Blue v1.0
