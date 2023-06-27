'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">poultry-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' : 'data-bs-target="#xs-controllers-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' :
                                            'id="xs-controllers-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' :
                                        'id="xs-injectables-links-module-AppModule-ddb330c40bbe23cde725dc4578db8944d7ae11f6b82ff8c4759e6d64047221305d4aceedca12d55090e72a39cb8a931ae0c853e97cbd3c47fb8feaba559f94aa"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c80d0ebb6ad783533de481af47b7ba7ffbd054c8cee10ce1fb9635de27fec07bac4f6951466e34d227dabd94b2c3d822c58ddd0b5b13e36b0b1f1c4927a69781"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c80d0ebb6ad783533de481af47b7ba7ffbd054c8cee10ce1fb9635de27fec07bac4f6951466e34d227dabd94b2c3d822c58ddd0b5b13e36b0b1f1c4927a69781"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c80d0ebb6ad783533de481af47b7ba7ffbd054c8cee10ce1fb9635de27fec07bac4f6951466e34d227dabd94b2c3d822c58ddd0b5b13e36b0b1f1c4927a69781"' :
                                        'id="xs-injectables-links-module-AuthModule-c80d0ebb6ad783533de481af47b7ba7ffbd054c8cee10ce1fb9635de27fec07bac4f6951466e34d227dabd94b2c3d822c58ddd0b5b13e36b0b1f1c4927a69781"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShedModule.html" data-type="entity-link" >ShedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' : 'data-bs-target="#xs-controllers-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' :
                                            'id="xs-controllers-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' }>
                                            <li class="link">
                                                <a href="controllers/ShedController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' : 'data-bs-target="#xs-injectables-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' :
                                        'id="xs-injectables-links-module-ShedModule-18c46af0c7e4d1de1e0acd085f5ca606495b10d507ebbd73a5dd4ce2b9399cf796935aee06d8a08051814b2e570c2af97c6c4b9ffe8abd94e245004c8e144ed5"' }>
                                        <li class="link">
                                            <a href="injectables/ShedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' : 'data-bs-target="#xs-controllers-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' :
                                            'id="xs-controllers-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' : 'data-bs-target="#xs-injectables-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' :
                                        'id="xs-injectables-links-module-TransactionModule-56284ff700e3b7a76b17b580c4afbd4bfb82b3447e7c30cd4e92815214468da84246c25fd58f016119f1f1a75b8e947204b970d097087eb1e93c42af17bb5715"' }>
                                        <li class="link">
                                            <a href="injectables/TransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' :
                                            'id="xs-controllers-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' :
                                        'id="xs-injectables-links-module-UsersModule-ee726a3f5b77c87fbd94cc118631fd4b8b3efc5ef6322869bb3ee8ac4b2ceb753da396791236188ff57942c5b591087e082efb4cbfec2aadcc2cb5219cec9880"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ShedController.html" data-type="entity-link" >ShedController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TransactionController.html" data-type="entity-link" >TransactionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateShedDto.html" data-type="entity-link" >CreateShedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Shed.html" data-type="entity-link" >Shed</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateShedDto.html" data-type="entity-link" >UpdateShedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransactionDto.html" data-type="entity-link" >UpdateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShedService.html" data-type="entity-link" >ShedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionService.html" data-type="entity-link" >TransactionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Shed.html" data-type="entity-link" >Shed</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});