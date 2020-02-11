$(document).ready(function() {
    
    const stripe_url = "https://api.stripe.com/";
    
    const secret_key = '';
   
    async function getProds() {
        let response = await fetch(stripe_url + "/v1/skus", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${secret_key}`
            }
        });
        let data = await response.json();
        return data;
    }

    var p2 = Promise.resolve(getProds());
    p2.then(
        function(v) {
            genProds(v.data);
        },
        function(e) {
            console.log(e);
        }
    );
    const formatPrice = (amount, currency) => {
        let price = (amount / 100).toFixed(2);
        let numberFormat = new Intl.NumberFormat(["en-US"], {
            style: "currency",
            currency: currency,
            currencyDisplay: "symbol"
        });
        return numberFormat.format(price);
    };

    function genProds(sku) {
        for (var i in sku) {
            
            var html = [
                ` <div id="${
          sku[i].id
        }" class="cell-sm-6 cell-md-4 view-animate fadeInRightSm delay-1 p-3"><article class="post-news bg-white"><a href="news-post-page.html"><img class="img-responsive" src="images/slide-03-1920x1000.jpg" width="370" height="240" alt=""></a>
                 <div class="post-news-body-variant-1">
                   <div class="post-news-meta h4">
                   ${sku[i].attributes.name}
                   </div>
                   <h6><a href="#">Price: ${formatPrice(
                     sku[i].price,
                     sku[i].currency
                   )}</a></h6>
                   
                   <div class="offset-top-9">
                   <button class="btn btn-ellipse btn-icon btn-icon-right btn-default" onclick="pagar('${
                    sku[i].id
                  }',1)"><span class="icon fa-shopping-cart"></span><span>Buy</span></button>
                  
                   </div>
                 </div>
               </article></div>`
            ].join("\n");

            $("#prods").append(html);
        }
    }
    
  

 
});