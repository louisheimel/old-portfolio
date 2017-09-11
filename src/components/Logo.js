import React, { Component } from 'react';
import '../Logo.css';

export class Logo extends Component {
  render() {
    return (
			<div>
				<div className="circle">
					<div className="initials">
						<div className="L">
							<svg viewBox="0 0 40 50">
								<g fill-rule="evenodd">
									<path stroke="none" fill="#FF6B35" stroke-width="1"  d="M0, 0 L 0,50 L40 50 L40 40 L10 40 L10 0 L0 0"></path>
								</g>
								
							</svg>
						</div>
						<div className="H">
							<svg viewBox="0 0 40 50">
								<g fill-rule="evenodd">
									<path stroke="none" fill="#FF6B35" stroke-width="1"  d="M0, 0 L 0,50 L 10 50 L 10 30 L 30 30 L 30 50 L 40 50 L 40 0 L 30 0 L 30 20 L 10 20 L 10 0 L 0 0"></path>
								</g>
								
							</svg>
						</div>
					</div>
						<p>powered by React</p>
					</div> 
				</div>
    );
  }
}
