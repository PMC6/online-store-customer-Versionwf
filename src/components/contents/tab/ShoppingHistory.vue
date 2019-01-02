<template>
  <div>

    <table id="cart" class="table table-hover table-condensed">
      <thead>
        <tr>
          <th style="width:50%">Product</th>
          <th style="width:10%">Price</th>
          <th style="width:8%">Quantity</th>
          <th style="width:10%" class="text-center">Subtotal</th>
          <th style="width:10%">Status</th>
          <th style="width:10%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <h4>2018-12-29 shopname</h4>
        </tr>
        <tr>
          <td data-th="Product">
            <div class="row">
              <div class="col-sm-2 hidden-xs">
                <img
                  src="http://placehold.it/100x100"
                  alt="..."
                  width="80px"
                  height="80px"
                  class="img-responsive"
                >
              </div>
              <div class="col-sm-10">
                <h4 class="nomargin">Product 1</h4>
                <p
                  class="mb-1"
                >Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </td>
          <td data-th="Price">$1.99</td>
          <td data-th="Quantity">
            <input type="number" readonly class="form-control text-center" value="1">
          </td>
          <td data-th="Subtotal" class="text-center">1.99</td>
          <td data-th="Status" class="text-center">Successful</td>
          <td class="Actions" data-th>
            <button type="button"  class="btn btn-info">Add Comment</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.shoppingHistory {
  width: 80%;
}
.card-record {
  width: 100%;
}
.table > tbody > tr > td,
.table > tfoot > tr > td {
  vertical-align: middle;
}
.nomargin {
  text-align: left;
  margin-left: 20px;
}
@media screen and (max-width: 600px) {
  table#cart tbody td .form-control {
    /* width:20%; */
    display: inline !important;
  }
  .actions .btn {
    width: 36%;
    margin: 1.5em 0;
  }

  .actions .btn-info {
    float: left;
  }
  .actions .btn-danger {
    float: right;
  }

  table#cart thead {
    display: none;
  }
  table#cart tbody td {
    display: block;
    padding: 0.6rem;
    min-width: 320px;
  }
  table#cart tbody tr td:first-child {
    background: #333;
    color: #fff;
  }
  table#cart tbody td:before {
    content: attr(data-th);
    font-weight: bold;
    display: inline-block;
    width: 8rem;
  }

  table#cart tfoot td {
    display: block;
  }
  table#cart tfoot td .btn {
    display: block;
  }
}
</style>


