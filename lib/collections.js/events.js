Events = new Mongo.Collection('events');

Events.allow ({
	insert: function(userId, doc) {
		return !! userId;
	}
});

