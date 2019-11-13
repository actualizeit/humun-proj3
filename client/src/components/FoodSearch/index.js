import React from "react";
import { Card, Icon, Table } from 'semantic-ui-react';
import API from "../../utils/Api";

const MATCHING_ITEM_LIMIT = 25; 

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        foods: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      API.search(value, foods => {
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const foodRows = foods.map((food, idx) => (
      <Table.Row key={idx} onClick={() => this.props.onFoodClick(food)}>
        <Table.Cell>{food.description}</Table.Cell>
        <Table.Cell className="right aligned">{food.kcal}</Table.Cell>
        <Table.Cell className="right aligned">{food.protein_g}</Table.Cell>
        <Table.Cell className="right aligned">{Number(food.fat_g).toFixed(2)}</Table.Cell>
        <Table.Cell className="right aligned">{food.carbohydrate_g}</Table.Cell>
      </Table.Row>
    ));

    return (
      <>
        <div className="ui fluid search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Search foods..."
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
            <i className="search icon" />
          </div>
          <i
            className="remove icon"
            onClick={this.handleSearchCancel}
            style={removeIconStyle}
          />
        </div>
        <Card fluid color='yellow' style={{ marginBottom: '2em' }}>
          <Card.Content header="Available Foods"></Card.Content>
          <Card.Content>
            <Table striped selectable fixed size="small" basic='very' style={{ marginBottom: '3em' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width="eight">Description</Table.HeaderCell>
                  <Table.HeaderCell textAlign='right'>Kcal</Table.HeaderCell>
                  <Table.HeaderCell textAlign='right'>Protein (g)</Table.HeaderCell>
                  <Table.HeaderCell textAlign='right'>Fat (g)</Table.HeaderCell>
                  <Table.HeaderCell textAlign='right'>Carbs (g)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {foodRows}
              </Table.Body>
            </Table>
          </Card.Content>
          <Card.Content extra>
            {foodRows.length === 0 && <><Icon name='food' />No Food Returned</>}
            {foodRows.length === 1 && <><Icon name='food' />1 Food Returned</>}
            {foodRows.length > 1 && <><Icon name='food' />{foodRows.length} Foods Returned</>}
          </Card.Content>
        </Card>
      </>
    );
  }
}

export default FoodSearch;
