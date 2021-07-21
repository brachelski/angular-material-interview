import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatCardHarness} from '@angular/material/card/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  describe('Mat Card', () => {
    let matCardHarness: MatCardHarness;
    beforeEach(async () => {
      matCardHarness = await loader.getHarness(MatCardHarness);
    });

    it('should exist', () => {
      expect(matCardHarness).toBeTruthy();
    });

    describe('Title', () => {
      it('should ', async () => {
        expect(await matCardHarness.getTitleText()).toEqual('Button Not Clicked')
      });
    });

    describe('Button', () => {
      let buttonHarness: MatButtonHarness;
      beforeEach(async () => {
        buttonHarness = await matCardHarness.getHarness(MatButtonHarness);
      });

      it('should exist', () => {
        expect(buttonHarness).toBeTruthy();
      });

      it('should have correct text', async () => {
        expect(await buttonHarness.getText()).toEqual('Click Me!');
      });

      it('should have correct color', async () => {
        expect(await (await buttonHarness.host()).getAttribute('color')).toEqual('accent');
      });

      it('should change card title when clicking button', async () => {
        await buttonHarness.click();
        expect(await matCardHarness.getTitleText()).toEqual('Button Clicked 1 Time!');
      });

      describe('When Clicking Button Multiple Times', () => {
        [2, 3, 4, 5].forEach(testCase => {
          it(`should show ${testCase} as count of clicks`, async () => {
            let i = 0;
            while (i < testCase) {
              await buttonHarness.click();
              i ++;
            }

            expect(await matCardHarness.getTitleText()).toEqual(`Button Clicked ${testCase} Times!`);
            expect(await buttonHarness.isDisabled()).toEqual(false);
          });
        });

        it('should disable button after 10 clicks', async () => {
          let i = 0;
          while (i < 10) {
            await buttonHarness.click();
            i ++;
          }

          expect(await matCardHarness.getTitleText()).toEqual('Button Clicked 10 Times!');
          expect(await buttonHarness.isDisabled()).toEqual(true);
        });
      });
    });
  });
});
