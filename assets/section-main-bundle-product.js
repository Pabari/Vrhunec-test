if($('.selected-stencils-slider').length > 0) {
  $('.selected-stencils-slider').flickity({ 
    'cellAlign': 'left', 
    'contain': true, 
    'wrapAround': true,
    'pageDots': false
  });
}

$('body').on('click', '.bunle-products-listing li', function(){
  var product_name = $(this).data("product-name");
  var this_stencil = $(this).html();
  if($(".selected-stencils-slider .empty:first").length > 0) {
    $(".selected-stencils-slider .empty:first").append(this_stencil).removeClass("empty").addClass("active");
    $(this).addClass("selected_stencil"); 
    $("#selected-stencils-kit input.empty:first").val(product_name).removeClass("empty").addClass("active");
    updpateDisplayCount();
  } else {
    alert("You have already selected the maximum stencils.")
  }
  var windowWidth = window.innerWidth;
  if (windowWidth > 1023) {
    if($("#selected-stencils-kit .empty").length == 3) {
      $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-100%)");
    }
  } 
  else if (windowWidth <= 1023 && windowWidth > 580) {
    if($("#selected-stencils-kit .empty").length == 4) {
      $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-99.99%)");
      $('.selected-stencils-slider .flickity-slider .selected-stencil-wrapper:nth-child(4)').css('transform', "translateX(-99.99%)");
    }
    else if($("#selected-stencils-kit .empty").length == 2) {
      $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-166.65%)");
    }
  }
  else {
    var emptyLength = jQuery("#selected-stencils-kit .empty").length;
    switch (emptyLength) {
      case 6:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-100%)");
        break;
      case 5:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-200%)");
        break;
      case 4:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-300%)");
        break;
      case 3:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-400%)");
        break;
      case 2:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-500%)");
        break;
      case 1:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-600%)");
        break;
      case 0:
        $('.selected-stencils-slider .flickity-slider').css('transform', "translateX(-700%)");
        break;
      default:
        console.log(jQuery("#selected-stencils-kit .empty").length)
    }
  }
});

function updpateDisplayCount(){
  if($("#selected-stencils-kit .empty").length == 0) {
    $("span[data-add-to-cart-text]").text("Add to Cart");
    $("button[name=add]").removeAttr("disabled");
    $("#selected_product_count").text(jQuery("#selected-stencils-kit .active").length);
  } else {
    $("button[name=add]").attr("disabled", true);
    $("span[data-add-to-cart-text]").text($("#selected-stencils-kit .empty").length + " selection Remaining");
    console.log(jQuery("#selected-stencils-kit .active").length);
    $("#selected_product_count").text(jQuery("#selected-stencils-kit .active").length);
  }
}

$('body').on('click', '.bundle-products-desktop-filter a', function(e){
  e.preventDefault();
  var selected_design = $(this).data('selected');
  $('.bundle-products-desktop-filter a').removeClass('active');
  $(this).addClass('active');
  $('.bunle-products-listing li').hide();
  $('.bunle-products-listing .'+selected_design).show();
});

$('body').on('change', '#stencil-kit-filters', function(e){
  e.preventDefault();
  var selected_design = $(this).val();
  $('.bunle-products-listing li').hide();
  $('.bunle-products-listing .'+selected_design).show();
});

$('body').on('click', '.selected-stencil-wrapper button', function(){
  var remove_stencil_id = $(this).data('stencil-id');
  var product_name = jQuery("#" + remove_stencil_id) .find("span:last-child") .text();
  var listElement = $(".bunle-products-listing") .find("[data-product-name='" + product_name + "']");
  $("#" + remove_stencil_id).removeClass("active").addClass("empty").find("span").remove();
  $("#final_" + remove_stencil_id).val("").removeClass("active").addClass("empty");
  var prod_check_select = $(".selected-stencils-slider .active").find("[data-product='" + product_name + "']");
  if(prod_check_select.length == 0) {
    listElement.removeClass("selected_stencil");
  }
  updpateDisplayCount();
});