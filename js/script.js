$(document).ready(function(){

	//toggle menu

	$('#menu').click(function(){
		$(this).toggleClass('fa-times');
		$('header').toggleClass('toggle');
	});

	//toggle menu when smaller screen

	$(window).on('scroll load', function(){
		$('#menu').removeClass('fa-times');
		$('header').removeClass('toggle');

		if($(window).scrollTop() > 0){
			$('.top').show();

		}else{
			$('.top').hide();
		}
	})

	//scroll to section
	$('a[href*="#"]').on('click', function(e){


		e.preventDefault();

		$('html, body').animate({
			scrollTop : $($(this).attr('href')).offset().top,

		},
			500,
			'linear'
		);


	});


})