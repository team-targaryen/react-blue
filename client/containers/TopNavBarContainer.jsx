import React, { Component } from 'react';
import Edit from '../components/navEdit.jsx';
import Zoom from './../components/navZoom.jsx';
import Export from '../components/navExport.jsx';

class TopNavbar extends Component {
  constructor() {
    super();

    this.state = {
      isEditOpen: false,
      zoomPercent: 75
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
  }

  toggleEdit() {
    this.setState({
      isEditOpen: !this.state.isEditOpen
    });
  }

  updateZoom(e) {
    this.setState({
      zoomPercent: e.target.value
    });
  }

  /// PLACEHOLDER UNTIL MERGE
  handleExportClick() {
    console.log('export click');
  }

  render() {
    return (
      <div id='top-nav'>
        <Export handleExportClick={this.handleExportClick} />
        <Edit toggleEdit={this.toggleEdit} isEditOpen={this.state.isEditOpen} />
        <Zoom
          updateZoom={this.updateZoom}
          zoomPercent={this.state.zoomPercent}
        />
      </div>
    );
  }
}

export default TopNavbar;
