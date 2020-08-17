"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var board_component_component_1 = require("./board-component.component");
describe('BoardComponentComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [board_component_component_1.BoardComponentComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(board_component_component_1.BoardComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
