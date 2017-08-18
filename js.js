$(function(){
	$('#search').on('click',function() {
		var searchVal = $('#searchVal').val();
		if (searchVal == '') return;
		$('.search-content a').remove();
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + searchVal,
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				console.log(data)
				var pages = data.query.pages;
				for( page in pages ) {
					$('.search-content').append('<a href=https://en.wikipedia.org/wiki/' + pages[page].title + ' target=_blank><h4>' + pages[page].title + '</h4><p>' + pages[page].extract + '</p></a>');
				}
				$('main').css({
					'top' : 20 + 'px',
					'transform' : 'translate(-50%,0)'
				});
				$('.search-content').css({
					'marginTop': 260,
					'opacity': 1
				});
				if(!$('.search-content').hasClass('animate')) {
					$('.search-content').addClass('animate');
				}
				$('#searchVal').val('');  //must clean the value or cant get the complete ajax data,I dont know why.
				$('#searchVal').attr('placeholder','must clean the value or cant get the complete ajax data,I dont know why');
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
	$('#close').on('click',function() {
		$('.search-content a').remove();
		$('main').css({
			'top' : 400 + 'px',
			'transform' : 'translate(-50%,-40%)'
		});
		$('.search-content').css({
			'marginTop': 400,
			'opacity': 0,
		});
		if($('.search-content').hasClass('animate')) {
			$('.search-content').removeClass('animate');
		}
	})
});