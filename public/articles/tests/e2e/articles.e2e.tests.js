describe('Articles E2E Tests:', function() {
  describe('New Article Page', function() {
    it('Should not be able to create a new article', function() {
        
      //equesting the Create Article page    
      browser.get('http://localhost:3000/#!/articles/create');
      //submit the form
      element(by.css('input[type=submit]')).click();
      //found the error element
      element(by.binding('error')).getText().then(function(errorText) {
        expect(errorText).toBe('User is not logged in');
      });
    });
  });
});