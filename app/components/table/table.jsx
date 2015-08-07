var React = require('react');
var TableRow = require('./table-row');
var classnames = require('classnames');
var ReactPaginate = require('react-paginate');

var Table = React.createClass({
  getInitialState: function() {
    this.skip = 0;
    return {
      headers: this.props.headers
    };
  },
  handlePageClick: function(page) {
    this.skip = page.selected * this.props.limit;
    return this.loadData();
  },
  loadData: function() {
    return this.props.onLoadData(this.skip, this.column, this.direction);
  },
  handleHeaderClick: function(header) {
    var headers, k, v;
    headers = this.state.headers;
    for (k in headers) {
      v = headers[k];
      if (header === k) {
        headers[k].sort = !headers[k].sort;
        this.column = header;
        this.direction = headers[k].sort;
      } else {
        headers[k].sort = null;
      }
    }
    this.loadData();
    return this.setState({
      headers: headers
    });
  },
  render: function() {
    var className;
    className = classnames({
      'table-responsive-vertical': this.props.responsive
    });


    return (
      <div>
        <div className={'up-table ' + className}>
          <table id="table" className="sortable table table-hover table-mc-light-blue">
            <thead>
              <tr>
                <For each="k" of={Object.keys(this.state.headers)}>
                  <If condition={this.state.headers[k].show}>
                    <th key={k} onClick={this.handleHeaderClick.bind(this, k)}>
                      <div className="header-name">
                        {this.state.headers[k].name}
                        <If condition={this.state.headers[k].sort === true}>
                          <div className="asc header-icon">
                            <i className="icon-sort"></i>
                          </div>
                        </If>
                        <If condition={this.state.headers[k].sort === false}>
                          <div className="desc header-icon">
                            <i className="icon-sort"></i>
                          </div>
                        </If>
                      </div>
                    </th>
                  </If>
                </For>
              </tr>
            </thead>
            <If condition={this.props.loading}>
              <tbody className="loading-message">
                <tr><td><div className="loading-text">Loading...</div></td></tr>
              </tbody>
            <Else/>
              <tbody>
                <For each="rowData" index="i" of={this.props.tableData}>
                  <TableRow key={i} headers={this.props.headers} rowData={rowData}/>
                </For>
              </tbody>
            </If>
          </table>
          <If condition={this.props.showPagination}>
            <div>
              <ReactPaginate previousLabel={"<"}
                nextLabel={">"}
                breakLabel={<li className="break"><a href="">...</a></li>}
                pageNum={this.props.pageCount || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                clickCallback={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pager"}
                activeClass={"active"} />
            </div>
          </If>
        </div>
      </div>
    );
  }
});

module.exports = Table;