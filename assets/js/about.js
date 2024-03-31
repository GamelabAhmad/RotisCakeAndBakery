$(document).ready(function(){
    $('#apaItuRotis').click(function(){
        $(this).toggleClass('active');
        $('#deskripsiApaItuRotis').toggleClass('show');
    });

    $('#sejarahRotis').click(function(){
        $(this).toggleClass('active');
        $('#deskripsiSejarahRotis').toggleClass('show');
    });
});
