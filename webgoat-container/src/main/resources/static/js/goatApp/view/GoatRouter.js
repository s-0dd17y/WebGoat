define(['jquery',
    'underscore',
    'backbone',
    'goatApp/controller/LessonController',
    'goatApp/controller/MenuController',
    'goatApp/view/LessonContentView',
    'goatApp/view/MenuView',
    'goatApp/view/DeveloperControlsView'
    ], function ($,
    _,
    Backbone,
    LessonController,
    MenuController,
    LessonContentView,
    MenuView,
    DeveloperControlsView) {
    
    var lessonContentView = new LessonContentView();
    var menuView = new MenuView();
    var developerControlsView = new DeveloperControlsView();

    var GoatAppRouter = Backbone.Router.extend({
        routes: {
            'welcome':'welcomeRoute',
            'lesson/:name':'lessonRoute'
            //'attack/:scr/:menu/:stage':'attackRoute',
            //'attack/:scr/:menu/*stage/:num':'attackRoute',
        },

        lessonController: new LessonController({
            lessonContentView: lessonContentView
        }),

        menuController: new MenuController({
            menuView: menuView
        }),

        init:function() {
            goatRouter =  new GoatAppRouter();
            this.lessonController.start();
            // this.menuController.initMenu();
            webgoat = {};
            webgoat.customjs = {};

//            goatRouter.on('route:attackRoute', function(scr,menu,stage,num) {
//                this.lessonController.loadLesson(scr,menu,stage,num);
//                this.menuController.updateMenu(scr,menu);
//            });
            goatRouter.on('route:lessonRoute', function(name) {
                this.lessonController.loadLesson(name);
                //TODO - update menu code from below
                this.menuController.updateMenu(name);
            });

            goatRouter.on('route:welcomeRoute', function() {
                this.lessonController.loadWelcome();
            });
            goatRouter.on("route", function(route, params) {});

            Backbone.history.start();
            this.listenTo(this.lessonController, 'menu:reload',this.reloadMenu)
        },

        reloadMenu: function (curLesson) {
            this.menuController.updateMenu();
        }


    });

    return GoatAppRouter;

});
