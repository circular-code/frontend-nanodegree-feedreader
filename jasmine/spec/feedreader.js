/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        for (var i = allFeeds.length; i; i--) {
            it('url is defined and not empty', function() {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            });
        }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        for (var j = allFeeds.length; j; j--) {
            it('name is defined and not empty', function() {
                expect(allFeeds[j].name).toBeDefined();
                expect(allFeeds[j].name.length).toBeGreaterThan(0);
            });
        }

        //extra test case - compressed to one loop, can be used to check both without having to iterate twice
        for (var k = allFeeds.length; k; k--) {
            it('name and url are defined and not empty', function() {
                expect(allFeeds[k].name).toBeDefined();
                expect(allFeeds[k].url).toBeDefined();
                expect(allFeeds[k].name.length).toBeGreaterThan(0);
                expect(allFeeds[k].url.length).toBeGreaterThan(0);
            });
        }
    });

    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('menu is hidden by default', function() {
            expect(document.body.className).toBe('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu changes visibilty when clicked', function() {
            if (document.body.className === 'menu-hidden') {
                document.querySelector('.menu-icon-link').click();
                expect(document.body.className).toBe('');
            }
            if (document.body.className === '') {
                document.querySelector('.menu-icon-link').click();
                expect(document.body.className).toBe('menu-hidden');
            }
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // modified from https://jasmine.github.io/tutorials/your_first_suite, dont need setTimeout to fake async since loadFeed is async
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('there is at least a single .entry element within the .feed container', function(done) {
            // double not turns the element into bolean representation (since an element is not falsy it will return true if found)
            var hasEntry = !!document.querySelector('.entry');
            expect(hasEntry).toBe(true);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {

                //save content into feedContent after loading the first feed
                feedContent = document.querySelector('.feed').innerText;
                loadFeed(1, function() {
                    //load the second feed and then give control to the async it function
                    done();
                });
            });
        });

        it('the content has changed', function(done) {
            // get new content
            var newFeedContent = document.querySelector('.feed').innerText;
            // compare with old content
            expect(newFeedContent).not.toBe(feedContent);
            done();
        });
    });
}());
