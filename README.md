**jQuery-FadeLabel Plugin** enables you to fade in and out label of text input or textarea on focus/blur/keyup events. 

UX enhancement for labels acting as initial value via CSS position:absolute

Requirements: input/textarea must have an 'id' and label must have 'for' attribute

**Quick Start:**

	<script src="/path/to/jquery-library.js"></script>
	<script src="/path/to/jquery.fadeLabel.js"></script>
	<script>
		$(document).ready(function () {
			$('form .fadeLabel').fadeLabel();
		});
	</script>