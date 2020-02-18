$(function() {
	$('.dialog').hide();
	$('.file').draggable({
  		containment: "document"  // ограничевает перетаскваемую область док-м
	});


	$('.folder').droppable({ drop:function(event){

		if($('.ui-draggable-dragging').hasClass('file')) {
		   ($(this).children(".dialog")).append($('.ui-draggable-dragging'));
		   $('.ui-draggable-dragging').addClass('in-cart');
		    $('.in-cart').css({
				'top': '0px',
				'left': '0px'
			}).draggable({
	  		//containment: "parent"  // ограничевает перетаскваемую область родительскими элементом - dialog
			});

		} else {
			$(this).droppable("disable" ); // чтобы ничего другого кроме файлов не могло закинуться в папку
		}

		$(this).droppable("enable");  // восстановить фунцию закидывания после попытки закинуть не файл

		if($(this).children(".dialog").css('display') == "flex"){
		    ($(this).children(".dialog")).children('.in-cart').show();
		} else { ($(this).children(".dialog")).children('.in-cart').hide()}   // чтобы скрывать только те , которые именно сейчас ложаться в корзину, а не все (иначе когда папка уже открыта, если снова положить файлы в эту же папку - файлы в папке исчезнут)
	}});



	$('.file').draggable({  
 		 drag: function(event) {
 		 if($('.folder').hasClass('ui-droppable-hover')) {
			$(this).draggable({ revert: false });
 		 } else {
 		 	$(this).draggable({ revert: true });  // возвращаем файл на прежнее место, если он не был заброшен вкуда-либо при перетаскивании
 		 }
	}});


	$('.file-row').droppable({drop:function(event) {  // вернуть файлы на рабочий стол
			if($('.ui-draggable-dragging').hasClass('file')) {
				$(this).append($('.ui-draggable-dragging'))
			}
		}

	})




	$('.folder').dblclick(function(event) {
		$(this).children(".dialog").show();
		$('.in-cart').show().draggable();

		/*$('.in-cart').draggable({
  			containment: "parent"  // ограничевает перетаскваемую область родительскими элементом - dialog
		});*/
		$('.dialog').draggable();
		($(this).children(".dialog")).droppable({ drop:function(event){  // закидывать файлы в открытое окно
	   		if($('.ui-draggable-dragging').hasClass('file')) {
				$(this).append($('.ui-draggable-dragging'));
	   			$('.ui-draggable-dragging').addClass('in-cart');
	    		$('.in-cart').css({
					'top': '0px',
					'left': '0px'
				}).draggable();
			} else {
				$(this).droppable("disable" );  // чтобы в окно можно было закинуть только файл, а не другое окно в том числе
			}
			$(this).droppable("enable" );  // воссстановить функцию закидывания

	    }});

		$(this).children(".dialog").children('.close-btn').click(function(event) {  // чтобы закрывалось только одно нужно окно, по которому нажали, когда открыты несколько окон;
				$(this).parent().hide();
		});
	});





	 // Корзина
	$(function() {       
		$('.folder').draggable();
		$('.basket').droppable({ drop:function(){
	  		$('.ui-draggable-dragging').remove();
	}});
});





});


