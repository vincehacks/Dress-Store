// Created by Vince Chang
(function(){

  // Backbone collection that holds information for each dress that is rendered
  const items =[
    {
      "product-title": "Nightway Lace Halter Gown",
      "product-image": "https://tinyurl.com/y9j7b9so",
      "product-description": "Sure to make the best-dressed list! A delicate " +
      "lace bodice, alluring keyhole detail and high slit make this Nightway " +
      " halter gown a show-stopping piece.",
      "price":"$109"
    },
    {
      "product-title": "Ruffle-Sleeve Sheath Dress",
      "product-image": "https://tinyurl.com/yas3aps3",
      "product-description": "Updated with beauty of ruffled sleeves, this " +
      " timeless Vince Camuto sheath dress works for all occasions.",
      "price":"$138"
    }
  ];

  // Using channel which is used to communicate between backbone views
  const channel = _.extend({}, Backbone.Events);

  // Created a Backbone Model
  const ProductModel = Backbone.Model.extend({});

  // Created a Backbone Collection that holds different models which are items
  const ProductCollection = Backbone.Collection.extend({model: ProductModel});

  // Created a new instance of the collection and pass in my items as the model
  const productCollection = new ProductCollection(items);

  // Global variable that holds all user information + item information
  var stringBuilder = "";

  /*****************************************************************************
  * Name: ProductView
  * Parameters: Backbone collection
  * Description: Once an instance of ProductView is instantiated, the render()
  * will compile the #productViewTemplate. Each item that is in my passed in
  * collection will be appened to #productView
  *****************************************************************************/
  const ProductView = Backbone.View.extend({
    el: "#productView",
    initialize(){
      /* Using Backbone channel to retrieve item information
       * saveUserSelection will listen when it should make a call to
       * getCollectionData
       */
      channel.on('saveUserSelection',this.getCollectionData.bind(this));
      this.render();
    },
    render(){
      const source = $('#productViewTemplate').html();
      const template = Handlebars.compile(source);

      // Iterate through collection of dresses and append items to #productView
      this.collection.each((item) => {
        this.$el.append(template(item.toJSON()));
      });
      return this;
    },
    /* getCollectionData() will retrieve the collection data that was passed in
     * and let sendUserSelectionData() know that the data is ready to be used */
    getCollectionData(){
      channel.trigger("sendUserSelectionData",this.collection.toJSON());
    }
  });

  /*****************************************************************************
  * Name: ShippingView
  * Parameters: None
  * Description: Once an instance of ShippingView is instantiated, the render()
  * will compile the #shippingViewTemplate, listen for sendUserSelectionData to
  * then call showShipping() passing in the data for the items.
  * savUserSelection is triggered to let ProductView() know that I am ready to
  * receive the data
  * Once the finishButton is clicked, initializedCheckout is called.
  *****************************************************************************/
  const ShippingView = Backbone.View.extend({
    el: "#shippingView",
    initialize(){
      this.render();
      channel.on("sendUserSelectionData",this.showShipping,this);
      channel.trigger("saveUserSelection");
    },
    events:{
      "click #finishButton" : "initializeCheckout"
    },
    render(){
      const source = $('#shippingViewTemplate').html();
      const template = Handlebars.compile(source);
      this.$el.html(template);
    },
    /* showShipping() will hide the nextButton and productView then will record
     * user selected product information into stringBuilder
     * `userChoices` has data that pertains to size, color, quantity
     * `data` that is passed in hold information about the product title/price
     * Logic iterates through the choices, only appending the item if the
     * Quantity section was filled out! (this is my logic for finding out if
     * a user is purchasing an item)
     */
    showShipping(data) {
      $('.product-info').attr("hidden", true);
      $('#nextButtonFlag').attr("hidden", true);
      $('.shipping-info').attr("hidden", false);

      let userChoices = ($(".choices").serializeArray());
      let selectStringBuilder = "";
      let prodIndex = 0;

      // Logic for appending information to stringBuilder
      userChoices.forEach((e)=> {
        selectStringBuilder += `${e.name}: ${e.value}<br>`;
        if(e.name === "Quantity"){
          if(e.value && parseInt(e.value,10) > 0){
            const productStringBuilder =
            `Product: ${data[prodIndex]["product-title"]}<br>
            Price: ${data[prodIndex]["price"]}<br>`;
            stringBuilder += productStringBuilder + selectStringBuilder;
          }
          selectStringBuilder = "";
          prodIndex++;
        }
      });
    },
    /* Once the user clicks on the finishButton, this function executes and
     * instantiates a new instance of CheckoutView */
    initializeCheckout(){
      const checkoutView = new CheckoutView();
    }
  });

  /*****************************************************************************
  * Name: CheckoutView
  * Parameters: None
  * Description: Once an instance of CheckoutView is instantiated, the render()
  * will compile the #checkoutViewTemplate and call showCheckout()
  *****************************************************************************/
  const CheckoutView = Backbone.View.extend({
    el: "#checkoutView",
    initialize(){
      this.showCheckout();
    },
    /* showCheckout() will hide the shippingView then will record shipping
     * information into #willBeShippedTo */
    showCheckout(data) {
      $('.shipping-info').attr("hidden", true);

      const source = $('#checkoutViewTemplate').html();
      const template = Handlebars.compile(source);
      this.$el.append(template);

      /* I am appending the recipt information here because only this module
       * knows about #selectedProducts even though data is saved
       * in shippingView() */
      $("#selectedProducts").append(stringBuilder);

      // Grab the user's shipping info and append to willBeShippedTo
      let shipInfo = ($(".shipping-info").serializeArray());
      shipInfo.forEach((e) => {
        $("#willBeShippedTo").append(`${e.name}: ${e.value}<br/>`);
      });
    }

  });

  /*****************************************************************************
  * Name: MainView
  * Parameters: None
  * Description: This is the main container for the all 3 views. MainView will
  * know about all the views.
  * Once an instance of MainView is instantiated, the render()
  * will compile the #mainViewTemplate and call renderProductView()
  * The nextButton will also instantiate a new shippingView upon user click
  *****************************************************************************/
    const MainView = Backbone.View.extend({
    el: ".big-container",

    events:{
      "click #nextButton" : "initializeShippingView"
    },
    render(){
      const source = $('#mainContainerTemplate').html();
      const template = Handlebars.compile(source);
      this.$el.html(template);
      return this;
    },
    /* renderProductView() will instantiate a new ProductView and show the items
     * a user can purchase from the website */
    renderProductView(){
      const productView = new ProductView({collection: productCollection});
    },
    /* initializeShippingView() will instantiate a new ShppingView once the user
     * clicks on the nextButton */
    initializeShippingView(){
      const shippingView = new ShippingView();
    }
  });

  // Create an instance of the mainContainer that starts the whole project!
  const mainView = new MainView();
  mainView.render();
  mainView.renderProductView();
})();