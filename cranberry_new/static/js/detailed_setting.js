          // control panel_link
//  $('#light_property').onclick = function(){
//          $('lightModal').show();      
//
//      console.log("setting clicked");
//  };


window.onload = function(){
    
/* Checkbox change event */
$('input[name="light_radio"]').change(function() {
    // 모든 radio를 순회한다.
    $('input[name="light_radio"]').each(function() {
        var value = $(this).val();              // value
        var checked = $(this).prop('checked');  // jQuery 1.6 이상 (jQuery 1.6 미만에는 prop()가 없음, checked, selected, disabled는 꼭 prop()를 써야함)
        // var checked = $(this).attr('checked');   // jQuery 1.6 미만 (jQuery 1.6 이상에서는 checked, undefined로 return됨)
        // var checked = $(this).is('checked');
        var $label = $(this).next();
 
        if(checked){
            $label.css('background-color', '#0d6efd');
                $('#' + value).collapse('toggle');
    }
        
        else
            $label.css('background-color', 'white');
            $('#' + value).collapse('hide');
        
        if(value == 'automatic'){
//            var map_data = {'lat' : '34.784771', 'lng':'125.980699'}
//            console.log(JSON.parse('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400'))
            
        }
    });
});
    
    
    function light_modal_onclick(){
        console.log('saved')
    }
    
}

    