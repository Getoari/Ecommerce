import React from 'react';

const Nav = () => (
	<React.Fragment>
    <header>
		<nav id="navigation">
			<div class="container">
				<div id="responsive-nav">
					<ul class="main-nav nav nav-navbar">
						<li class="active"><a href="#">Home</a></li>
						<li><a href="#">Hot Deals</a></li>
						<li><a href="#">Categories</a></li>
						<li><a href="#">Laptops</a></li>
						<li><a href="#">Smartphones</a></li>
						<li><a href="#">Cameras</a></li>
						<li><a href="#">Accessories</a></li>
					</ul>
				</div>
			</div>
		</nav>
    </header>
	<div class="section">
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-xs-6">
					<div class="shop">
						<div class="shop-img">
							<img src={"./img/shop01.png"} alt="" />
						</div>
						<div class="shop-body">
							<h3>Laptop<br />Collection</h3>
							<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-xs-6">
					<div class="shop">
						<div class="shop-img">
							<img src={"./img/shop03.png"} alt="" />
						</div>
						<div class="shop-body">
							<h3>Accessories<br />Collection</h3>
							<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-xs-6">
					<div class="shop">
						<div class="shop-img">
							<img src={"./img/shop02.png"} alt="" />
						</div>
						<div class="shop-body">
							<h3>Cameras<br />Collection</h3>
							<a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</React.Fragment>
)

export default Nav